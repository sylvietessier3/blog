define(['jquery', 'underscore', 'marionette', 'nprogress', 'SearchView', 'GalleryView', 'MovieService'],

    function ($, _, Marionette, NProgress, SearchView, GalleryView, MovieService) {

        var app = new Marionette.Application();

        app.addRegions({
            search: '#search',
            layout: '#layout'
        });

        app.addInitializer(function () {

            this.galleryView = new GalleryView();

            this.searchBox = new SearchView();
            this.searchBox.on('search:value:changed', _.bind(function (value) {
                NProgress.start();
                this.movieService.searchMovie(value, _.bind(function (data) {
                    this.galleryView.collection.reset(data);
                    NProgress.done();
                }, this));
            }, this));

            this.layout.show(this.galleryView);
        });

        app.on('start', function () {

            this.movieService = new MovieService();
            this.movieService.on('init', _.bind(function () {
                this.search.show(this.searchBox);
                this.searchBox.ui.input.val('mad max');
                this.searchBox.trigger('search:value:changed', this.searchBox.ui.input.val());
            }, this));
        });

        return app;

    });
