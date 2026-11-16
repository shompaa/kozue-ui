import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Toaster } from "@/components/ui/sonner"

const meta: Meta = { title: "Primitivos" }
export default meta
type Story = StoryObj

export const Buttons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Publicar</Button>
      <Button variant="secondary">Guardar borrador</Button>
      <Button variant="outline">Cancelar</Button>
      <Button variant="ghost">Ver blog</Button>
      <Button variant="destructive">Eliminar</Button>
      <Button variant="link">Ver todas</Button>
      <Button size="sm">Pequeño</Button>
      <Button disabled>Deshabilitado</Button>
    </div>
  ),
}

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Nuevo</Badge>
      <Badge variant="secondary">Italiana</Badge>
      <Badge variant="outline">Sin gluten</Badge>
      <Badge variant="success">Publicado</Badge>
      <Badge variant="warning">Borrador</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="danger">Error</Badge>
    </div>
  ),
}

export const Cards: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Receta del día</CardTitle>
        <CardDescription>Ramen de miso en casa</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Caldo umami, fideos perfectos y todos los toppings.
      </CardContent>
    </Card>
  ),
}

export const Inputs: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="t">Título</Label>
        <Input id="t" defaultValue="Pasta cremosa con parmesano" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="d">Descripción corta</Label>
        <Textarea id="d" placeholder="Una descripción breve..." />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked /> Receta destacada
      </label>
    </div>
  ),
}

export const Selects: Story = {
  render: () => (
    <Select defaultValue="facil">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Dificultad" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="facil">Fácil</SelectItem>
        <SelectItem value="media">Media</SelectItem>
        <SelectItem value="dificil">Difícil</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <Tabs defaultValue="nutricion" className="max-w-md">
      <TabsList>
        <TabsTrigger value="nutricion">Nutrición</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
      </TabsList>
      <TabsContent value="nutricion" className="pt-3 text-sm text-muted-foreground">
        520 kcal · 18 g proteínas · 68 g carbohidratos
      </TabsContent>
      <TabsContent value="seo" className="pt-3 text-sm text-muted-foreground">
        Slug, meta título y meta descripción.
      </TabsContent>
      <TabsContent value="avanzado" className="pt-3 text-sm text-muted-foreground">
        URL de video y estado de publicación.
      </TabsContent>
    </Tabs>
  ),
}

export const AccordionStory: Story = {
  name: "Accordion",
  render: () => (
    <Accordion type="single" collapsible className="max-w-md">
      <AccordionItem value="ing">
        <AccordionTrigger>Ingredientes</AccordionTrigger>
        <AccordionContent>400 g de pasta, 100 g de parmesano, 2 cdas de mantequilla.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="pasos">
        <AccordionTrigger>Pasos</AccordionTrigger>
        <AccordionContent>Cocina la pasta, derrite la mantequilla, integra el queso.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nueva categoría</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva categoría</DialogTitle>
          <DialogDescription>Se mostrará en “Explora por categoría”.</DialogDescription>
        </DialogHeader>
        <Input placeholder="Nombre" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button>Crear</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SheetStory: Story = {
  name: "Sheet",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir menú</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Kozue</SheetTitle>
          <SheetDescription>Navegación móvil</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export const DropdownMenuStory: Story = {
  name: "DropdownMenu",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Acciones</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Receta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Duplicar</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const TableStory: Story = {
  name: "Table",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Visitas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Pasta cremosa con parmesano</TableCell>
          <TableCell>
            <Badge variant="success">Publicado</Badge>
          </TableCell>
          <TableCell className="text-right">1200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ensalada mediterránea</TableCell>
          <TableCell>
            <Badge variant="warning">Borrador</Badge>
          </TableCell>
          <TableCell className="text-right">0</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const ToasterStory: Story = {
  name: "Toaster (sonner)",
  render: () => (
    <>
      <Button onClick={() => toast.success("Receta publicada")}>Mostrar toast</Button>
      <Toaster />
    </>
  ),
}
