import { getVById,approveVendor,rejectVendor } from "../models/vendorModel.js";

export const verifyVendor=async(req,res)=>{
    const {vendorId}=req.params;
    const {approve,reason}=req.body;
    if(approve===undefined){
        return res.status(400).json({ message: "Approval decision required" });
    }
    const vendor=await getVById(vendorId);
    if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  if (vendor.is_admin_verified) {
    return res.status(409).json({ message: "Vendor already approved" });
  }
  if(approve){
    await approveVendor(vendorId);
   return res.status(200).json({ message: "Vendor approved successfully" });
  } else {
    if (!reason) {
      return res.status(400).json({ message: "Rejection reason required" });
    }
    await rejectVendor(vendorId, reason);
    return res.status(200).json({ message: "Vendor rejected" });
    }
}