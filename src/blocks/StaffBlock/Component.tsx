import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Staff, StaffBlock as StaffBlockProps } from '@/payload-types';

export const StaffBlock: React.FC<StaffBlockProps> = ({ layout, staff }) => {
  const staffMembers = staff
    .map((member) => {
      if (
        member.staffMember &&
        typeof member.staffMember === 'object' &&
        'id' in member.staffMember &&
        member.staffMember.status === 'active'
      ) {
        return member.staffMember as Staff;
      } else {
        return undefined;
      }
    })
    .filter((member): member is Staff => member !== undefined);

  if (!staffMembers || staffMembers.length === 0) {
    return null;
  }

  if (layout === '2-col') {
    return (
      <div className="flex flex-col gap-8 lg:gap-24">
        {staffMembers.map((member) => (
          <div
            className={`grid grid-cols-1 gap-8 md:grid-cols-[1fr_2.5fr] lg:gap-12`}
            key={member.id}
          >
            <div className="flex">
              <Avatar className="h-44 w-44 md:h-52 md:w-52 lg:h-72 lg:w-72">
                {member.headshot && (
                  <AvatarImage>
                    <Media resource={member.headshot} />
                  </AvatarImage>
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
            <div className="flex flex-col">
              <h3>{member.name}</h3>
              <h5>
                {member.role
                  ?.map((role) => {
                    if (typeof role === 'string') return role;
                    if (typeof role === 'object') return role.name;
                  })
                  .join(', ')}
              </h5>
              {member.bio && (
                <RichText
                  data={member.bio}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (layout === '3-col') {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {staffMembers.map((member) => (
          <div className="flex flex-col items-center gap-8" key={member.id}>
            <Avatar className="h-44 w-44 md:h-52 md:w-52">
              {member.headshot && (
                <AvatarImage>
                  <Media resource={member.headshot} />
                </AvatarImage>
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
