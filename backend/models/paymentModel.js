import db from '../config/db.js';

const createPaymentTable=()=>{
    db.execute(
        `create table if not exists payments(
        id int auto_increment primary key,
        order_id int not null,
        user_id int not null,

        gateway_order_id varchar(100) not null,
        gateway_payment_id varchar(100) unique,
        gateway_sign varchar(255),

        amount decimal(10,2) not null,
        currency varchar(10) default 'INR',
        payment_method varchar(50),
        payment_gateway varchar(50),
        status ENUM(
        'created','pending','verifying','success','failed','refunded') DEFAULT 'created',

        failure_reason text,
        paid_at datetime,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        foreign key(order_id) references orders(id),
        foreign key(user_id) references users(id)

        )`
    );
    console.log("Payment Table is created");
}

export default createPaymentTable;

export const createPayment=async(order_id,user_id,gateway_order_id,amount,payment_method,payment_gateway)=>{
    const [res]=await db.execute(
        `insert into payments(order_id,user_id,gateway_order_id,amount,payment_method,payment_gateway) values (?,?,?,?,?,?)`
        ,[order_id,user_id,gateway_order_id,amount,payment_method,payment_gateway]
    );
    return res.insertId;
}

export const getPaymentByOrder=async(order_id)=>{
    const [res]=await db.execute(
        `select * from payments where order_id=?`,[order_id]
    );
    return res;
}

export const updateToVerify=async(order_id,gateway_payment_id,gateway_sign)=>{
    const [res]=await db.execute(
        `update payments set gateway_payment_id=?, gateway_sign=?, status='verifying'
        where order_id=?`,[gateway_payment_id,gateway_sign,order_id]
    );
    return res;
}

export const markPaymentSuccess=async(order_id)=>{
    await db.execute(
        `update payments set status='success',paid_at=now() where order_id=?`,[order_id]
    );
}
export const markPaymentFailure=async(order_id,reason)=>{
    await db.execute(
        `update payments set status='failed',failure_reason=? where order_id=?`,[reason,order_id]
    );
}

export const getUserPayments=async(userId)=>{
    const [res]=await db.execute(
        `select p.*,o.total_amount,o.status as order_status
        from payments p join orders o on p.order_id=o.id
        where p.user_id=? order by p.created_at desc`,
        [userId]
    );
    return res;
}