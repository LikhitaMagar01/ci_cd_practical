import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const AdminPage = async () => {
    const session = await getServerSession(authOptions)
    if (session?.user){
        return (<>welcome to admin page {session?.user?.username}</>)
    }
    return <h2>Please login to enter into admin page</h2>
}

export default AdminPage