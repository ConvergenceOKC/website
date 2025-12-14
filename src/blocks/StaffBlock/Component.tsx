import { getStaff } from '@/blocks/StaffBlock/getStaff';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StaffBlock as StaffBlockProps } from '@/payload-types';

export const StaffBlock: React.FC<StaffBlockProps> = async ({
  layout,
  roles,
}) => {
  // Fetch staff members with the selected roles
  const selectedRoles = roles?.map((role) => role.role || '') as string[];
  const staff = await getStaff(selectedRoles);

  if (layout === '2-col') {
    return (
      <div className="my-8 flex flex-col gap-8 md:my-16 lg:gap-24">
        {staff.docs.map((member) => (
          <div
            className={`grid grid-cols-1 gap-8 md:grid-cols-[1fr_2.5fr] lg:gap-12`}
            key={member.id}
          >
            <div className="flex justify-center">
              <Avatar className="h-44 w-44 md:h-52 md:w-52 lg:h-72 lg:w-72">
                {typeof member.headshot === 'object' &&
                  member.headshot?.url && (
                    <AvatarImage
                      src={member.headshot.url}
                      alt={member.name}
                      className="object-cover"
                    />
                  )}
                <AvatarFallback className="bg-convergence-beige-darker text-convergence-teal text-4xl lg:text-7xl">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4>{member.name}</h4>
              <h6>
                {member.role
                  ?.map((role) => {
                    if (typeof role === 'string') return role;
                    if (typeof role === 'object') return role.name;
                  })
                  .join(', ')}
              </h6>
              {member.bio && (
                <RichText
                  data={member.bio}
                  enableGutter={false}
                  enableProse={false}
                  className="text-center md:text-left"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (layout === '3-col') {
    return (
      <div className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:my-16 lg:grid-cols-3">
        {staff.docs.map((member) => (
          <div className="flex flex-col items-center gap-8" key={member.id}>
            <Avatar className="h-44 w-44 md:h-52 md:w-52">
              {typeof member.headshot === 'object' && member.headshot?.url && (
                <AvatarImage
                  src={member.headshot.url}
                  alt={member.name}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-convergence-beige-darker text-convergence-teal text-4xl">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center text-center">
              <h5 className="mb-1">{member.name}</h5>
              <p>
                {member.role
                  ?.map((role) => {
                    if (typeof role === 'string') return role;
                    if (typeof role === 'object') return role.name;
                  })
                  .join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};
