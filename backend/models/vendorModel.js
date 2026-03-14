
import db from '../config/db.js';

export const createVendorTable=()=>{
    db.execute(
       `create table if not exists vendor(
       id int auto_increment primary key,
       name varchar(100) not null,
       email varchar(100) not null unique,
       phone_number varchar(25) unique,
       password varchar(255) not null ,
       business_name varchar(50) not null,
       business_type varchar(50) not null,
       is_active boolean default true,
       is_admin_verified boolean default false,

       rejected_reason varchar(255),
       approved_at timestamp null,
       created_at timestamp default current_timestamp,
       updated_at timestamp default current_timestamp on update current_timestamp
        )` 
    );
    console.log("Vendor Table created ");
};

export const alterVendorTable=()=>{
    db.execute(
        `ALTER TABLE vendor
    ADD COLUMN role ENUM('user','vendor','admin')
    NOT NULL DEFAULT 'vendor'`
    );
    console.log("Altered table vendor by adding rows");
};

export const createVendor=async(name,email,phone_number,password,business_name,business_type)=>{
    const [res]=await db.execute(
        `insert into vendor(name,email,phone_number,password,business_name,business_type) values (?,?,?,?,?,?)`,
        [name,email,phone_number,password,business_name,business_type]
    );
    return res;
}
export const getVByEmail=async(email)=>{
    const [res]=await db.execute(
        `select * from vendor where email=? `,[email]
    );
    return res[0];
}
export const getVById=async(id)=>{
    const [res]=await db.execute(
        `select id,name,email,phone_number, business_name, business_type,is_active,is_admin_verified
        from vendor where id=? `,[id]
    );
    return res[0];
}

export const isEmailExistV=async(email)=>{
    const [res]=await db.execute(
        `select id from vendor where email=?`,[email]
    );
    return res.length>0;
}
export const getVendors=async()=>{
    const [row]=await db.execute(
        `select name,email,phone_number,business_name,business_type from vendor`
    );
    return row;
};
export const getNVerified=async()=>{
    const [row]=await db.execute(
        `select id,name,email,is_admin_verified from vendor where is_admin_verified=false`
    );
    return row;
}

export const deleteVendor=async(id)=>{
    const [res]=await db.execute(
        `update vendor set is_active=false where id=?`,[id]
    );
    return res;
}

export const approveVendor=async(id)=>{
    const [res]=await db.execute(
        `update vendor set is_admin_verified=true, approved_at=NOW(),rejected_reason=null 
        where id=? and is_admin_verified=false`,[id]
    );
    return res[0];
}

export const rejectVendor=async(id,reason)=>{
    const [res]=await db.execute(
        `update vendor set is_admin_verified=false,rejected_reason=?,approved_at=null where id=?`,[id,reason]
   );
   return res[0];
}
export const getPendingVendors=async()=>{
    const [res]=await db.execute(
        `select * from vendor where is_admin_verified=false`
    )
    return res;
}

//Methods for vendor dashboard analysis things 

export const getTotalProducts=async(vendorId)=>{
    const [res]=await db.execute(
        `select count(*) as total_products
        from product where vendor_id=? and is_active=1`,[vendorId]
    )
    return res[0];
}

export const getOrderByV=async(vendorId)=>{
    const [res]=await db.execute(
        `select o.id as orderId,o.user_id,o.total_amount,
        o.status,o.created_at,oi.product_id,oi.quantity,oi.price,
        p.name as product_name from orders o join 
        order_items oi on o.id=oi.order_id
        join product p on oi.product_id=p.id
        where p.vendor_id=?`,[vendorId]
    );
    return res;
}

export const getTotalSales=async(vendorId)=>{
    const [res]=await db.execute(
        `select sum(oi.price*oi.quantity) as total_Sales
        from order_items oi join product p on 
        oi.product_id=p.id join orders o on 
        oi.order_id=o.id where p.vendor_id=? and o.status='paid'`,
        [vendorId]
    );
    return res[0];
}

export const topProd=async(vendorId)=>{
    const [res]=await db.execute(
        `select p.id,p.name,sum(oi.quantity) as total_sold from order_items oi join product p on
        oi.product_id=p.id join orders o on oi.order_id=o.id
        where p.vendor_id=? and o.status='paid'
        group by p.id order by total_Sold desc
        limit 3`,[vendorId]
    );
    return res;
}

export const pendOrders=async(vendorId)=>{
    const [res]=await db.execute(
        `select count(distinct o.id) as pending_orders from orders o 
        join order_items oi on o.id=oi.order_id
        join product p on oi.product_id=p.id
        where p.vendor_id=? and o.status='pending' `,[vendorId]
    );
    return res[0];
}