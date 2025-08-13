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
    .select(`*, order_items(*), user_profiles(*)`)
    .eq("order_number", orderNumber)
    .single();
  if (orderError) return null;

  // Step 2: Extract unique product_ids
  const productIds = order.order_items.map((item: { product_id: string }) => item.product_id);

  // Step 3: Fetch product_images for these productIds
  const { data: productImages, error: imagesError } = await adminSupabase
    .from("product_images")
    .select("*")
    .in("product_id", productIds);

  if (imagesError) {
    console.error(imagesError);
    return;
  }

  // Step 4: Map images to order_items
  const imagesByProductId: Record<string, any[]> = {};
  productImages.forEach((img) => {
    if (!imagesByProductId[img.product_id]) {
      imagesByProductId[img.product_id] = [];
    }
    imagesByProductId[img.product_id].push(img);
  });

  order.order_items = order.order_items.map((item: { product_id: string }) => ({
    ...item,
    product_images: imagesByProductId[item.product_id] || []
  }));

  // Now `order.order_items` has a `product_images` array for each item
  console.log(order);
  return order;
}

export async function createOrderWithUser(order: any) {
  let userId: string | null = null;
  let userEmail = order.customerEmail;
  let userFullName = order.customerName;
  let userPhone = order.customerPhone;
  let createdUserId: string | null = null;
  let createdOrderId: string | null = null;

  const { data: userList, error: userFetchError } = await adminSupabase
    .from("user_profiles")
    .select("id, email")
    .eq("email", userEmail);

  if (userFetchError) throw userFetchError;
  if (userList && userList.length > 0) {
    userId = userList[0].id;
  } else {
    // First create user in user_profiles
    const { data: profileUser, error: profileError } = await adminSupabase
      .from("user_profiles")
      .insert([
        {
          email: userEmail,
          full_name: userFullName,
          phone: userPhone,
          is_admin: false
        }
      ])
      .select()
      .single();

    if (profileError) throw profileError;
    userId = profileUser.id;
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
    if (userId) {
      await adminSupabase.from("user_profiles").delete().eq("id", userId);
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
    if (userId) {
      await adminSupabase.from("user_profiles").delete().eq("id", userId);
    }
    throw itemInsertError;
  }

  return { orderNumber, id: orderData.id };
}

export async function getAllOrders() {
  const { data, error } = await adminSupabase
    .from("orders")
    .select(`*, order_items(*), user_profiles(*)`);
  if (error) throw error;
  return data ?? [];
}
