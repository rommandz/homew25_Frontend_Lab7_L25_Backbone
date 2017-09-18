var President = Backbone.Model.extend({
    defaults: {
        name: '',
        surname: '',
        rate: 0
    },
    validate: function (attributes) {
        if (attributes.name === '' || attributes.surname === '') {
            console.log('error');
            return 'Name cant be empty';
        }
    }
});

var PresidentsCollection = Backbone.Collection.extend({
    model: President
});

var presidentsCollection = new PresidentsCollection([
    {
        name: 'George',
        surname: 'Washington',
        rate: 12
    }, {
        name: 'Barack',
        surname: 'Obama',
        rate: 25
    }, {
        name: 'Bill',
        surname: 'Clinton',
        rate: 25
    }
]);

presidentsCollection.push(new President({name: 'Petro', surname: 'Poroshenko'}));

presidentsCollection.comparator = 'name';
presidentsCollection.sort();

var PresidentView = Backbone.View.extend({
    tagName: 'tr',
    className: 'president',
    render: function() {
        this.$el.html(`<td>${this.model.get('name')}</td>
                       <td>${this.model.get('surname')}</td>
                       <td>${this.model.get('rate')}</td>`);
        return this;
    }
});

var PresidentViewCollection = Backbone.View.extend({
    tagName: 'tbody',
    className: 'tbody',
    render: function() {
        this.model.forEach(el => {
            this.$el.append(new PresidentView({model: el}).render().$el);
        })
        return this;
    }
});

var presidentsView = new PresidentViewCollection({model: presidentsCollection});

$('.table').append(presidentsView.render().$el);

var FormView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(presidents) {
        $('#btn').on('click', function() {
            var newPresident = new President({
                                            name: $('#name').val(),
                                            surname: $('#surname').val(),
                                            rate: $('#rate').val()
                                         });
            presidents.model.push(newPresident);

            $('.tbody').empty();
            presidents.render();

            $('#name').val('');
            $('#surname').val('')
            $('#rate').val('')
        })
    }
});

new FormView(presidentsView);
