import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ShadcnExample() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shadcn/UI Example</h1>
      
      <div className="grid gap-6">
        {/* Button Examples */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>
        
        {/* Card Example */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content goes here. This is a simple example of a card component from shadcn/ui.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* Input Example */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <div className="grid gap-4">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
            <div className="flex gap-2">
              <Input placeholder="With button" />
              <Button>Submit</Button>
            </div>
          </div>
        </section>
        
        {/* Dialog Example */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog component from shadcn/ui. It's a modal that can be used to display content that requires user interaction.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>Dialog content goes here.</p>
              </div>
              <DialogFooter>
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </div>
  );
} 