import Link from "next/link"


const Header = () => {
    return (
        <header>
            <h1>Nobox Blog</h1>

            <nav>
                <ul>
                    <li>
                        <Link href={"/"}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={"/post"}>
                            Post
                        </Link>
                    </li>
                    <li>
                        <Link href={"/auth/login"}>
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
