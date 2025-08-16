import { createFileRoute } from '@tanstack/react-router'
import { Navigate } from '@tanstack/react-router';
export const Route = createFileRoute('/_homeLayout/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/" hash="products" replace />;
}
