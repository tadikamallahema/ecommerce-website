import db from '../config/db.js';

export const createOrderItemsTable=()=>{
    db.execute(
        `create table if not exists order_items(
        id int auto_increment primary key,
        order_id int not null,
        product_id int not null,
        quantity int not null,
        price decimal(10,2) not null,
        foreign key(order_id) references orders(id),
        foreign key(product_id) references product(id)
        )`
    );
    console.log("Order items table created ")
}

export const addOrderItem = async (orderId, item) => {
    await db.execute(
        `INSERT INTO order_items(order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price_at_time] // <- change here
    );
};
export const getOrderItems=async(orderId)=>{
    const [rows]=await db.execute(
        `select oi.*,p.name from order_items oi join 
        product p on oi.product_id=p.id
        where oi.order_id=?`,[orderId]
    );
    return rows;
}