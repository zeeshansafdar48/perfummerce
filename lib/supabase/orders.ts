import { adminSupabase } from "../supabaseAdminClient";

export async function createOrder(order: any) {
  // Generate a unique order number (could be improved)
  const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const { data, error } = await adminSupabase
    .from("orders")
    .insert([
      {
        ...order,
        orderNumber,
        status: "pending",
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getOrderByNumber(orderNumber: string) {
  // Get order and its items in one query
  const { data: order, error: orderError } = await adminSupabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_number", orderNumber)
    .single();
  if (orderError) return null;
  return order;
}

export async function createOrderWithUser(order: any) {
  let userId: string | null = null;
  let userEmail = order.customerEmail;
  let userFullName = order.customerName;
  let userPhone = order.customerPhone;
  let createdUserId: string | null = null;
  let createdOrderId: string | null = null;

  // Try to find user by email in auth.users
  const { data: userList, error: userFetchError } = await adminSupabase.auth.admin.listUsers({
    filter: `email.eq.${userEmail}`
  });
  if (userFetchError) throw userFetchError;
  if (userList && userList.users && userList.users.length > 0) {
    userId = userList.users[0].id;
  } else {
    // Create user in Supabase Auth
    const { data: newUser, error: createUserError } = await adminSupabase.auth.admin.createUser({
      email: userEmail,
      password: "Per@123",
      email_confirm: true,
      user_metadata: {
        full_name: userFullName,
        phone: userPhone
      }
    });
    if (createUserError || !newUser.user)
      throw createUserError || new Error("Failed to create user");
    userId = newUser.user.id;
    createdUserId = userId;
  }

  // 2. Insert order in orders table
  const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const { data: orderData, error: orderError } = await adminSupabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_amount: order.total,
        status: "pending",
        payment_method: order.paymentMethod,
        shipping_address: `${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState}, ${order.shippingZip}`,
        placed_at: new Date().toISOString(),
        order_number: orderNumber
      }
    ])
    .select()
    .single();
  if (orderError) {
    // Rollback user if we just created them
    if (createdUserId) {
      await adminSupabase.auth.admin.deleteUser(createdUserId);
    }
    throw orderError;
  }
  createdOrderId = orderData.id;

  // 3. Insert order items
  const items = order.items || [];
  try {
    for (const item of items) {
      const { error: itemError } = await adminSupabase.from("order_items").insert([
        {
          order_id: orderData.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price
        }
      ]);
      if (itemError) throw itemError;
    }
  } catch (itemInsertError) {
    // Rollback order
    if (createdOrderId) {
      await adminSupabase.from("orders").delete().eq("id", createdOrderId);
    }
    // Optionally rollback user if just created
    if (createdUserId) {
      await adminSupabase.auth.admin.deleteUser(createdUserId);
    }
    throw itemInsertError;
  }

  return { orderNumber, id: orderData.id };
}
