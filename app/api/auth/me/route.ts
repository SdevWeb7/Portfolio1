import {getServerSession} from "next-auth";
import {authOptions} from "../../../../src/auth";
import {NextResponse} from "next/server";

export default async function GET () {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json([])
    }
    return NextResponse.json(session)
}