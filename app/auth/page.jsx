import {getServerSession} from "next-auth";
import {authOptions} from "/lib/auth";
import {redirect} from "next/navigation";
import {LoginButtonEmail, LoginButtonGithub} from "./AuthButtons";

export default async function AuthPage () {
    const session = await getServerSession(authOptions)

    if (session) {
        return redirect('/')
    }

    return <section className={'auth'}>

        <LoginButtonEmail />

        <LoginButtonGithub />
    </section>
}