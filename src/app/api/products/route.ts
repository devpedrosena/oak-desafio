import { type NextRequest, NextResponse } from "next/server";
import { query, run, type Product } from "@/lib/db";

export async function GET() {
    try {
        const products = await query<Product>(
            "SELECT id, name, description, price, available FROM products ORDER BY price ASC"
        );
        return NextResponse.json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json(
            { error: "Erro ao buscar os produtos." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, description, price, available }: Partial<Product> =
            await request.json();

        if (!name || !description || price === undefined || available === undefined) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios." },
                { status: 400 }
            );
        }

        const numericPrice = typeof price === "string" ? parseFloat(price) : price;

        if (isNaN(numericPrice)) {
            return NextResponse.json(
                { error: "O preço informado é inválido." },
                { status: 400 }
            );
        }

        if (typeof numericPrice !== "number" || typeof available !== "boolean") {
            return NextResponse.json(
                { error: "Dados inválidos para preço ou disponibilidade." },
                { status: 400 }
            );
        }

        const params = [name, description, numericPrice, available ? 1 : 0];

        const result = await run(
            "INSERT INTO products (name, description, price, available) VALUES (?, ?, ?, ?)",
            params
        );

        const newProductId = result.lastInsertRowid;
        return NextResponse.json(
            { message: "Produto criado com sucesso.", id: newProductId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json(
            { error: "Erro ao criar o produto." },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { name, description, price, available }: Partial<Product> =
            await request.json();

        if (!name || !description || price === undefined || available === undefined) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios." },
                { status: 400 }
            );
        }

        const numericPrice = typeof price === "string" ? parseFloat(price) : price;

        if (isNaN(numericPrice)) {
            return NextResponse.json(
                { error: "O preço informado é inválido." },
                { status: 400 }
            );
        }

        if (typeof numericPrice !== "number" || typeof available !== "boolean") {
            return NextResponse.json(
                { error: "Dados inválidos para preço ou disponibilidade." },
                { status: 400 }
            );
        }

        const productId = Number(params.id);
        if (isNaN(productId)) {
            return NextResponse.json(
                { error: "ID do produto inválido." },
                { status: 400 }
            );
        }

        const result = await run(
            "UPDATE products SET name = ?, description = ?, price = ?, available = ? WHERE id = ?",
            [name, description, numericPrice, available ? 1 : 0, productId]
        );

        if (result.changes === 0) {
            return NextResponse.json(
                { error: "Produto não encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Produto atualizado com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar o produto." },
            { status: 500 }
        );
    }
}
