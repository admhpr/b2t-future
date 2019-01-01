    const options = {
        rootMargin: '0px',
        threshold: 0.6
    };

    const srcMap = new Map();

    const images = document.querySelectorAll('.featured');

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                loadImage(entry.target)
            }
        })
    }

    const loadImage = (image) => {
        const src = srcMap[image.alt]
        fetchImage(src).then(() => {
            image.src = src;
        })
    }

    const fetchImage = (url) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
            image.onerror = reject;
        });
    }

    if ('IntersectionObserver' in window) {
        // Observer code
        const observer = new IntersectionObserver(handleIntersection, options);
        images.forEach(img => {
            srcMap[img.alt] = img.src;
            img.src = "";
            observer.observe(img);
        })
    } else {
        // IO is not supported.
        // Just load all the images
        Array.from(images).forEach(image => loadImage(image));
    }

    console.log(`
                         ~~~~~
                        ( o o )
+------------------.oooO--(_)--Oooo.------------------+
|     let's                                           |
|     work           .oooO        github.io/harps116  |
|     together!      (   )   Oooo.                    |
+---------------------\ (----(   )--------------------+
                       \_)    ) /
                             (_/
    `);