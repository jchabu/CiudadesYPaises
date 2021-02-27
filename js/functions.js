var segundosContador = 0;

export function startCounter() {
    segundosContador += 1;
    var contenedor = document.getElementsByClassName('segundos')[0];
    contenedor.textContent = segundosContador;
}

export function stopCounter(counter) {
    clearInterval(counter)
    segundosContador = 0;
}

function createNode(name, content, classes, attributes) {
    var node = document.createElement(name);

    if (content != "") {
        var nodeContent = document.createTextNode(content);
        node.appendChild(nodeContent);
    }
    if (classes.length > 0) {
        classes.forEach(classElement => {
            node.classList.add(classElement);
        });
    }

    if (attributes.length > 0) {
        attributes.forEach(nodeAttribute => {
            node.setAttribute(nodeAttribute.name, nodeAttribute.value);
        })
    }
    return node;
}

export function shuffle(object) {
    for (let i = object.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = object[i]
        object[i] = object[j]
        object[j] = temp
    }
    return object;
}