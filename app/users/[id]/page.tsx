import EditUserForm from './EditUserForm'

interface Props {
    params: { id: string }
}

export default function UserDetailsPage({ params }: Props) {
    return <EditUserForm id={params.id} />
}