import { NextRequest } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {name, email, password} = await request.json();
    } catch (error) {
        
    }

}