import {useLogin} from "../hooks/useLogin";


export const AuthenticationWrapper: React.FC = props => {
    const {flow} = useLogin();

    if (flow) {
        return (
            <>
                {props.children}
            </>
        )
    }

    return <div>Not logged in... maybe loading? Flow {flow}</div>
}
