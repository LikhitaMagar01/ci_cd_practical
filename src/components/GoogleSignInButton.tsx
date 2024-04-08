import { FC, ReactNode } from "react"
import { Button } from "./ui/button"

interface GoogleSignUpButtonProps {
    children?: ReactNode,
    label?: string
}

const loginWithGoogle = () => console.log('login with google')
const GoogleSignUpButton: FC<GoogleSignUpButtonProps> = ({children, label}) => {
    return (<>
        <Button onClick={loginWithGoogle} className="w-full">
            {label}
            {children}
        </Button>
    </>)
}

export default GoogleSignUpButton