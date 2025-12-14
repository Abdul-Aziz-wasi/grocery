import authOptions from "@/src/lib/auth";
import uploadOnCloudinary from "@/src/lib/cloudinary";
import dbConnect from "@/src/lib/db";
import User from "@/src/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions);
        if(!session || !session.user.email || !session.user.id){
            return NextResponse.json(
                {message:"Unauthorized"},
                 {status:401}
            )
        }

        const formData = await req.formData();
        const name = formData.get("name") as string;
        const file = formData.get("file") as Blob;

        let imageUrl;

        if(file){
            imageUrl=await uploadOnCloudinary(file);
        }
        const user =await User.findByIdAndUpdate(session.user.id,{
            name,
            image:imageUrl
        },{new:true})

        if(!user){
            return NextResponse.json(
                {message:"User not found"},
                 {status:404}
            )
        }
        return NextResponse.json(
            {message:"Profile updated successfully",user},
             {status:200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {message:"Internal Server Error"},
             {status:500}
        )
        
    }
}