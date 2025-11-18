import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  name?: string;
  phone?: string;
  imageUrl?: string;
  isOnline?: boolean;
}

export function ProfileHeader({
  name = 'Dr. Emily Carter',
  phone = '+1 (555) 123-4567',
  imageUrl = 'https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=400',
  isOnline = true
}: ProfileHeaderProps) {
  return (
    <div className='bg-card flex items-center gap-4 rounded-xl border-none px-6 py-0 shadow-none transition-shadow hover:shadow-md'>
      <div className='relative'>
        <Avatar className='ring-primary/10 h-8 w-8 rounded-full ring-2'>
          <AvatarImage
            src={imageUrl || '/assets/profile-placeholder.svg'}
            alt={name}
            className='object-cover'
          />
          <AvatarFallback className='bg-gradient-to-br from-teal-500 to-teal-600 text-xl font-medium text-white'>
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className='border-card absolute top-5 left-5 h-4 w-4 rounded-full border-[3px] bg-green-500 shadow-sm' />
        )}
      </div>
      <div className='flex flex-col gap-0'>
        <h2 className='text-foreground text-sm leading-tight font-semibold'>
          {name}
        </h2>
        <p className='text-muted-foreground text-sm font-medium'>{phone}</p>
      </div>
    </div>
  );
}
