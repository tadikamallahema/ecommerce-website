import db from '../config/db.js';

export const createOrderTable=()=>{
    db.execute(
        `create table if not exists orders(
        id int auto_increment primary key,
        user_id int not null,
        total_amount decimal(10,2) not null,
        status enum ('pending','paid','cancelled') default 'pending',
        created_at timestamp default current_timestamp,

        foreign key(user_id) references users(id)
        )`
    );
    console.log("Orders Table is created");
}

export const createOrder=async(userId ,total,status="paid")=>{
    const [res]=await db.execute(
        `insert into orders(user_id,total_amount,status) values(?,?,?)`,[userId,total,status]
    );
    return res.insertId;
}

/* export const getUserOrders=async(userId)=>{
    const [rows]=await db.execute(
        `select * from orders where user_id=? order by created_at desc`,[userId]
    );
    return rows;
} */

export const getUserOrders = async (userId) => {

  const [rows] = await db.execute(
    `SELECT o.id AS order_id,o.total_amount,o.status,o.created_at,oi.product_id,
      oi.quantity,
      oi.price
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     WHERE o.user_id = ?
     ORDER BY o.created_at DESC`,
    [userId]
  );

  const ordersMap = {};

  for (const row of rows) {

    if (!ordersMap[row.order_id]) {
      ordersMap[row.order_id] = {
        id: row.order_id,
        total_amount: row.total_amount,
        status: row.status,
        created_at: row.created_at,
        items: []
      };
    }

    if (row.product_id) {
      ordersMap[row.order_id].items.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price
      });
    }
  }
  return Object.values(ordersMap);
};

export const updateOrderStatusById = async (orderId, userId, status) => {
  const [result] = await db.execute(
    `UPDATE orders SET status = ? WHERE id = ? AND user_id = ?`,
    [status, orderId, userId]
  );
  return result.affectedRows;
};

export const getOrderById=async(order_id)=>{
    const [res]=await db.execute(
        `select * from orders where id=? `,[order_id]
    );
    return res[0];
}