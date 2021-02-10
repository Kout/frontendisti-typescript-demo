import { getRandomCatImage } from "./cat-widget-api.js";

class CatWidget extends HTMLElement {
    private _content: HTMLDivElement;

    constructor() {
        super();
        this._init();
    }

    connectedCallback() {
        this._loadNextCat();
    }

    private _init() {
        const shadowRoot = this.attachShadow({ mode: "closed" });

        const style = document.createElement("style");
        style.textContent = `
            :host { display: block; width: 500px; height: 500px; border: 1px solid #ccc; border-radius: 8px; overflow: hidden; }
            #container { display: flex; height: 100%; align-items: center; justify-content: center; }
            .image { display: block; max-width: 100%; max-height: 100%; }
        `;

        shadowRoot.appendChild(style);

        this._content = document.createElement("div");
        this._content.id = "container";
        this._content.innerHTML = "Mmt ... sháním kočičku!";

        shadowRoot.appendChild(this._content);
    }

    private _loadNextCat = async () => {
        try {
            const randomCatImg = await getRandomCatImage();

            if (typeof randomCatImg == "string") {
                this._replaceWithNewCatImage(randomCatImg);
            } else {
                this._content.innerHTML =
                    "Kočičky hlásí chybu: " + randomCatImg.message;
            }

            setTimeout(this._loadNextCat, 3e3);
        } catch (err) {
            console.error(err);
            this._content.innerHTML = "Dneska už žádné kočičky!";
        }
    };

    private _replaceWithNewCatImage(src: string) {
        this._content.innerHTML = "";

        const image = document.createElement("img");
        image.className = "image";
        image.src = src;

        this._content.appendChild(image);
    }
}

customElements.define("cat-widget", CatWidget);
