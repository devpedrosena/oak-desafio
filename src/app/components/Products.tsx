"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import ProductModal from "./ProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
}

export default function Products({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts || []);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    useEffect(() => {
        if (!products || products.length === 0) {
            fetchProducts(); 
        }
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/products`);
            if (res.ok) {
                const data = await res.json();
                setProducts(data || []);
            } else {
                console.error("Erro ao buscar produtos:", res.statusText);
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (product: Product | null = null) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
        fetchProducts(); 
    };

    const openDeleteModal = (product: Product) => {
        setCurrentProduct(product);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCurrentProduct(null);
    };

    const handleDelete = async () => {
        if (currentProduct) {
            try {
                await fetch(`${baseUrl}/api/products/${currentProduct.id}`, { method: "DELETE" });
                fetchProducts(); 
                closeDeleteModal();
            } catch (error) {
                console.error("Erro ao deletar produto:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[#002828]">Gestão de produtos</h1>
            <Button onClick={() => openModal()} className="mb-6 bg-[#002828] hover:bg-[#003f3f]">
                Adicionar novo produto
            </Button>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                    <div className={`overflow-x-auto ${isLoading ? "blur-sm opacity-50" : ""} transition duration-300`}>
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className="bg-[#002828] text-white">
                                    <TableHead className="font-bold">Nome</TableHead>
                                    <TableHead className="font-bold hidden sm:table-cell">Descrição</TableHead>
                                    <TableHead className="font-bold">Preço</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products && products.length > 0 ? (
                                    products.map((product) => (
                                        <TableRow key={product.id} className="hover:bg-gray-50">
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{product.description}</TableCell>
                                            <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${product.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                                        }`}
                                                >
                                                    {product.available ? "Disponível" : "Indisponível"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => openModal(product)}>
                                                        <Edit className="h-4 w-4 text-[#002828]" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => openDeleteModal(product)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            Nenhum produto encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                            <span className="text-[#002828] font-semibold">Carregando...</span>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && <ProductModal product={currentProduct} onClose={closeModal} onProductSaved={fetchProducts} />}
            {isDeleteModalOpen && (
                <DeleteConfirmModal
                    productName={currentProduct?.name || ""}
                    onConfirm={handleDelete}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    );
}

export async function getServerSideProps() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products`);
    const data = await res.json();

    return { props: { initialProducts: data || [] } };
}
