"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface Product {
    id?: number
    name: string
    description: string
    price: number
    available: boolean
}

interface ProductModalProps {
    product: Product | null
    onClose: () => void
    onProductSaved: () => void
}

export default function ProductModal({ product, onClose, onProductSaved }: ProductModalProps) {
    const [formData, setFormData] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        available: true,
    })

    useEffect(() => {
        if (product) {
            setFormData(product)
        }
    }, [product])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, available: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const url = product ? `/api/products/${product.id}` : "/api/products"
        const method = product ? "PUT" : "POST"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        onProductSaved()
        onClose()
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product ? "Editar produto" : "Adicionar novo produto"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="price">Preço</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="available" checked={formData.available} onCheckedChange={handleSwitchChange} />
                        <Label htmlFor="available">Disponível</Label>
                    </div>
                    <Button type="submit" className="w-full bg-[#002828] hover:bg-[#003f3f]">
                        {product ? "Atualizar" : "Adicionar"} Produto
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

