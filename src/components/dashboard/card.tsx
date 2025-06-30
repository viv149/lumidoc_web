import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
    title: string;
    count: number;
    link: string;
    icon: ReactNode;
}

export default function Card({ title, count, link, icon }: CardProps) {
    return (
        <Link href={link} className="card" style={{textDecoration:"none"}}>
            <div className="card-body">
                <div className="text-success">{icon}</div>
                <h3 className="card-title ">{title}</h3>
                <p className="text-success fw-bold fs-3">{count}</p>
            </div>
        </Link>
    );
}
