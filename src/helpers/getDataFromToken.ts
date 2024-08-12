import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async(request:NextRequest)=>{
    try {
        const Token=request.cookies.get("token")?.value || "";

        const DecodedToken:any= jwt.verify(Token,
            process.env.TOKEN_SECRET!)

        return DecodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}