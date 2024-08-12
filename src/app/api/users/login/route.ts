import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){

    try {
        const reqBody=await request.json();
        const {email, password}=reqBody;

        const user= await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User does not Exists"},
                                     {status:400})
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error:"Invalid Credentials"},
                                     {status:400})
        }

        if(!user.isVerified){
            return NextResponse.json({error:"User is not Verified."},
                {status:400})
        }

        const payload={
            id:user._id,
            username:user.username,
            email:user.email,
        }

        const token=jwt.sign(payload, process.env.TOKEN_SECRET!,
                            {expiresIn: "1d"})

        const response=NextResponse.json(
            {
            message:"login Successful",
            success:true,
            },
            { status: 200 }
    )

    response.cookies.set("token", token,{httpOnly:true});

    return response;

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
