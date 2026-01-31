import Link from 'next/link';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Page } from '@/payload-types';
import { cn } from '@/utilities/ui';

type BreadcrumbsProps = {
  breadcrumbs: Page['breadcrumbs'];
  variant: Page['hero']['variant'];
  enableGutter?: boolean;
  className?: string;
};

export const RenderBreadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs = [],
  variant,
  enableGutter = true,
  className,
}) => {
  if (!breadcrumbs?.length) return null;

  // Process breadcrumbs to remove /home
  const processedBreadcrumbs = breadcrumbs.map((crumb) => {
    // If /home is the only breadcrumb, replace with /
    if (crumb.url === '/home') {
      return {
        ...crumb,
        url: '/',
      };
    }
    // Remove /home prefix from paths like /home/messages
    if (crumb.url?.startsWith('/home/')) {
      return {
        ...crumb,
        url: crumb.url.replace('/home', ''),
      };
    }
    return crumb;
  });

  return (
    <Breadcrumb
      className={cn(
        'py-10',
        { 'bg-convergence-beige': variant === 'light' },
        { 'bg-convergence-teal': variant === 'dark' },
        className,
      )}
    >
      <BreadcrumbList className={enableGutter ? 'container' : ''}>
        {processedBreadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.id}>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className={cn('uppercase underline-offset-4 hover:underline', {
                  'text-convergence-brown/70 hover:text-convergence-brown':
                    variant === 'light',
                  'text-convergence-beige/70 hover:text-convergence-beige':
                    variant === 'dark',
                })}
              >
                <Link href={crumb.url || '#'}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < processedBreadcrumbs.length - 1 && (
              <BreadcrumbSeparator
                className={cn({
                  'text-convergence-brown': variant === 'light',
                  'text-convergence-beige': variant === 'dark',
                })}
              />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
