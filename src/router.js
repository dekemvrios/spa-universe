export class Router {
    
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        const e = event || window.event
        e.preventDefault()
        window.history.pushState({}, "", e.target.href)
        this.handle()
    }

    handle() {
        const {pathname} = window.location
        const route = this?.routes?.[pathname] || this?.routes?.[404]

        fetch(`http://localhost:3000/${route}`)
            .then((data) => data.text())
            .then((data) => {
                // set page base html data
                document.getElementById("app").innerHTML = data
                
                // set link activation style
                const elems = document.getElementsByClassName('link')
                for (let i of elems) {
                    i.classList.remove('active');
                }
                const c = pathname === "/" ? "home" : pathname.replace("/", "")
                document.getElementById(`a-${c}`).classList.add('active')
                
                const body = document.getElementsByTagName("body")[0]
                body.classList.remove("home", "universe", "explorer")
                body.classList.add(c)
            })
            .catch((e) => console.log(e))
    }
}