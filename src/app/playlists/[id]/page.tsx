import { getMyPlaylists } from '@/lib/services/spotify'
import React from 'react'

const Page = async ({ params }: { params: { id: string }}) => {

  const playlists = await getMyPlaylists();
  const playlist = playlists.find(p => p.id === params.id)

  if (playlist === undefined) {
    return null
  }

  return (
    <div>{playlist.name}</div>
  )
}

export default Page