import { NextRequest, NextResponse } from 'next/server';
import { run, type Product } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; 

    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    try {
        const { name, description, price, available }: Partial<Product> = await req.json();

        if (!name || !description || price === undefined || available === undefined) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
        }

        const numericPrice = typeof price === "number" ? price : Number.parseFloat(price);

        if (isNaN(numericPrice)) {
            return NextResponse.json({ error: "O preço informado é inválido." }, { status: 400 });
        }

        const booleanAvailable = typeof available === "boolean" ? available : available === 1;

        const result = await run(
            "UPDATE products SET name = ?, description = ?, price = ?, available = ? WHERE id = ?",
            [name, description, numericPrice, booleanAvailable ? 1 : 0, Number(id)]
        );

        if (result.changes === 0) {
            return NextResponse.json({ error: "Produto não encontrado ou não houve alterações." }, { status: 404 });
        }

        return NextResponse.json({ message: "Produto atualizado com sucesso." }, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
        return NextResponse.json({ error: "Ocorreu um erro ao atualizar o produto." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    try {
        const productId = Number(id);

        if (isNaN(productId)) {
            return NextResponse.json({ error: "ID do produto inválido." }, { status: 400 });
        }

        const result = await run("DELETE FROM products WHERE id = ?", [productId]);

        if (result.changes === 0) {
            return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
        }

        return NextResponse.json({ message: "Produto excluído com sucesso." }, { status: 200 });
    } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        return NextResponse.json({ error: "Ocorreu um erro ao excluir o produto." }, { status: 500 });
    }
}
