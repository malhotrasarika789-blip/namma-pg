function Logo() {
    return (
    <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-600/30">
        N
        </div>

        <div>
        <h1 className="text-xl font-bold text-white">
            Namma PG
        </h1>

        <p className="text-xs text-zinc-400">
            Operations Platform
        </p>
        </div>
    </div>
    );
}

export default Logo;