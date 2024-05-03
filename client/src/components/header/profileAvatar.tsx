import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
export default function ProfileAvatar ({ logout }: { logout: any }) {
  return (
    <div className=' rounded-full cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='bg-primary/60 p-0.5'>
            <AvatarImage src='/profileIcon.png' />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={'/profile/list'}>Mi Lista</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href={'/profile/settings'}>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
