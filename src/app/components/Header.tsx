
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background shadow-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <Image
                    src={"/logo.png"}
                    alt="Logo Oak"
                    width={90}
                    height={90}
                    />
                    <span className="sr-only">Acme Inc</span>
                </Link>
            </div>
            
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className=" md:none overflow-hidden rounded-full">
                            <img
                                src="/menu-hamburguer.svg"
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                                style={{ aspectRatio: "36/36", objectFit: "cover" }}
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-green-950" align="end">
                        <DropdownMenuLabel>Desafio de Projeto</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={"/sobre"}>Sobre o Projeto</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link target="_blank" href={"/PEDROSENA-Currículo.pdf"}>Meu Curriculo</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >
                            <Link  target="_blank" href={"https://wa.me/5571987247437"}>Fale Comigo</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

