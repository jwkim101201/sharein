import { useRouter } from 'next/router'

export default function ShowFile() {
  const router = useRouter()
  const { id } = router.query

  if (typeof window !== 'undefined') {
    window.location.href = '/api/file/' + id
  }
}
