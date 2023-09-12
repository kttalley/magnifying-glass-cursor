function magnify(imgID, zoom) {
            var img, glass, w, h, bw;
            img = document.getElementById(imgID);

            /* Create magnifier glass: */
            glass = document.createElement("DIV");
            glass.setAttribute("class", "img-magnifier-glass");
            
            /* Insert magnifier glass: */
            img.parentElement.insertBefore(glass, img);

            /* Set background properties for the magnifier glass: */
            glass.style.backgroundImage = "url('" + img.src + "')";
            glass.style.backgroundRepeat = "no-repeat";
            glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
            bw = 1.8; // match the magnification level
            w = glass.offsetWidth / 2;
            h = glass.offsetHeight / 2;


            function moveMagnifier(e) {
                var pos, x, y;
                /* Get the cursor's x and y positions: */
                pos = getCursorPos(e);
                x = pos.x;
                y = pos.y;
                /* Prevent the magnifier glass from being positioned outside the image: */
                if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
                if (x < w / zoom) {x = w / zoom;}
                if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
                if (y < h / zoom) {y = h / zoom;}
                /* Set the position of the magnifier glass: */
                glass.style.left = ((x - w)-120) + "px"; /* I added an offset of 120px, as it was otherwise appearing towards the bottom left of the cursor */
                glass.style.top = ((y - h)-120) + "px";
                /* Display what the magnifier glass "sees": */
                glass.style.backgroundPosition = "-" + ((((x * zoom) - w + bw))-120) + "px -" + ((((y * zoom) - h + bw))-120) + "px"; /* I added an offset of 120px, as it was otherwise appearing towards the bottom left of the cursor */
            }
            
          
            function getCursorPos(e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                /* Get the x and y positions of the image: */
                a = img.getBoundingClientRect();
                /* Calculate the cursor's x and y coordinates, relative to the image: */
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                /* Consider any page scrolling: */
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return {x : x, y : y};
            }

            /* Execute a function when someone moves the magnifier glass over the image: (moved to the page <head> with event listeners to trigger) */
            glass.addEventListener("mousemove", moveMagnifier);
            img.addEventListener("mousemove", moveMagnifier);
            
        }

        /* This will call the magnify function when the document is loaded */
        document.addEventListener("DOMContentLoaded", function() {
            magnify("myimage", 1.6);

            /* assign the image and the magifier div to variables */
            const image = document.getElementById("myimage");
            const magGlass = document.querySelector(".img-magnifier-glass");
            
            /* initial state with no mouseover on page load */
            let isMouseOver = false;

            /* using an event listener to watch for when the cursor is hovering over the image and setting the visibility of the magnifier to show */
            image.addEventListener("mouseenter", function() {
                magGlass.style.display = "block";
                isMouseOver = true;
            });

            /* addressing some "flickering" issues when the cursor was moved slowly or stopped */
            image.addEventListener("mousemove", function() {
                isMouseOver = true;
            });

            /* using a timeout function to ensure that the flickering issue is resolved, but keeping the function to set visibility to hide when not hovering over image */
            image.addEventListener("mouseleave", function() {
                setTimeout(function() {
                    if (!isMouseOver) {
                        magGlass.style.display = "none";
                    }
                }, 0.1);
            });

            magGlass.addEventListener("mouseenter", function() {
                isMouseOver = true;
            });

            magGlass.addEventListener("mouseleave", function() {
                isMouseOver = false;
                magGlass.style.display = "none";
            });
        });
            