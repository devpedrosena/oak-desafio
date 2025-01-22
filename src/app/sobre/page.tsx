"use client";

export default function AboutProject() {
    return (
        <section className="bg-[#002828] text-white py-10 px-6 rounded-lg shadow-md h-screen flex items-center justify-center">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Sobre o Projeto</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Este projeto foi desenvolvido como parte de um desafio técnico para a posição de Estagiário em Desenvolvimento na <span className="font-semibold">OAK Tecnologia</span>.
                    Ele apresenta um sistema de gestão de produtos funcional e responsivo, utilizando tecnologias modernas como <span className="font-semibold">Next.js</span>, <span className="font-semibold">React</span>, <span className="font-semibold">TailwindCSS</span>, e o banco de dados <span className="font-semibold">SQLite</span>.
                </p>
                <p className="text-lg leading-relaxed">
                    Criado por <span className="font-semibold">Pedro Henrique Sena</span>, este sistema demonstra boas práticas de desenvolvimento,
                    um design responsivo, e um fluxo intuitivo de criação, edição, e exclusão de produtos.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <a
                        href="https://www.linkedin.com/in/pedrohsenna/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#002828] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/devpedrosena"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#002828] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
