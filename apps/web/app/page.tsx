import { Button } from '@repo/ui';

export default function Page() {
  return (
    <main>
      <Button>Click me</Button>

      <Button variant="secondary">Click me 2</Button>

      <Button variant="destructive">Click me 3</Button>

      <Button variant="outline">Click me 4</Button>

      <Button variant="ghost">Click me 5</Button>
    </main>
  );
}
