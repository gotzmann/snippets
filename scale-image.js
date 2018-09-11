
<script>

    // This start scaling right after DOM is loaded - and we'll await actual image downloads inside the code of scaleImages

    $(function() { scaleImages() });

    // Smart scaling and cropping on the fly. Do not tracking page resize yet!

    function scaleImages() {

        // Wait till images fully loaded
        var deferreds = [];
        $('.scale').each(function() {
            if (!this.complete) {
                var deferred = $.Deferred();
                $(this).one('load', deferred.resolve);
                deferreds.push(deferred);
            }
        });

        $.when.apply($, deferreds).done(function() {

            $('.scale').each(function(i, item) {

                var nw = $(item).prop("naturalWidth");
                var nh = $(item).prop("naturalHeight");
                var w = $(item).prop("width");
                var h = $(item).prop("height");

                var wanted = h; // Scale image by container height

                var imageRatio = nw / nh;
                var divRatio = w / h;
                var factor = nw / w; // Suppose that image width is more than container

                var neww = 0;
                var newh = 0;
                var newTopMargin = 0;
                var newLeftMargin = 0;

                // Image is BIGGER than container
                if (factor >= 1) {

                    if (divRatio > imageRatio) {
                        neww = w;
                        newh = nh / factor;
                        newTopMargin = wanted - newh;
                    } else {
                        newh = wanted;
                        neww = nw / (nh / wanted);
                        newLeftMargin = w - neww;
                    }

                // Container is BIGGER than image
                } else {

                    if (divRatio > imageRatio) {
                        neww = w;
                        newh = h / factor;
                        newTopMargin = - (newh - wanted);
                    } else {
                        newh = wanted;
                        neww = nw / (nh / wanted);
                        newLeftMargin = w - neww;
                    }

                }

                $(item).css({'width': neww, 'height': newh, 'margin-top': newTopMargin, 'margin-left': newLeftMargin });
                $(item).removeClass('scale'); // Do not scale when new block of news will be loaded

            });
        });
    }

</script>
