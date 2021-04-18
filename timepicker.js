/*
    @WRWebDev - JQuery TimePicker v1.0
    © Will Robertson 2021 - MIT License
    https://github.com/
    
    Loads in place of the HTML markup:
    <input type="time" name="{pick a name}" (value="{hh:mm}" optional) />
*/

/*
    ! USER OPTIONS
    Default - 12:00 (midday)
    Must be integers!
    This is overwritten if a value is specified in the HTML
*/
let defaultTime = { hours: 12, mins: 0 }
const minInc = 15

// Takes int / str, returns string ( left padded with zeros, 2 chars long )
const twoDigitPad = val => ('00' + val).slice(-2)

// Arrays to generate dropdown options
const hours = [ ...Array(24).keys() ]
const mins = [ ...Array(4).keys() ]

// The markup is replaced with this content - takes the name as a string
const replacementContent = (name, time) => `
    <div class="wrtp-wrapper">
        <input 
            type="text"
            value="${twoDigitPad(time.hours)}:${twoDigitPad(time.mins)}"
            name="${name}" 
            hidden 
        />
        <div class="wrtp-inner-wrapper">
            <span>${twoDigitPad(time.hours)}:${twoDigitPad(time.mins)}</span>
            <button type="button">
                <div></div>
            </button>
        </div>
        <div class="wrtp-dropdown">
            <div class="wrtp-dropdown-hrs"></div>
            <div class="wrtp-dropdown-mins"></div>
        </div>
    </div>
`

// Creates the dropdown menus
const populateoptions = () => {
    $('.wrtp-dropdown-hrs').html(
        hours.map(i => `
            <div 
                class="wrtp-dropdown-selector-hrs ${i === defaultTime.hours ? 'selected' : null}" 
                data-val="${i}"
            >
                ${twoDigitPad(i)}
            </div>
        `)
    )
    // User can choose in the config options at the top
    // What minute increments should be included (default, every 15 mins)
    $('.wrtp-dropdown-mins').html(
        mins.map(i => `
            <div 
                class="wrtp-dropdown-selector-mins ${(i * minInc) === defaultTime.mins ? 'selected' : null}" 
                data-val="${i * minInc}"
            >
                ${twoDigitPad(i * minInc)}
            </div>
        `)
    )
}

const bindDropdownOptions = wrapper => {

    const changeValue = (wrapper, selection, pos) => {
        let value = wrapper.children('input').val().split(':')
        value[pos] = ('00' + selection.attr('data-val')).slice(-2)
        wrapper.children('input').val(value.join(':'))
        wrapper.find('span').html(wrapper.children('input').val())
    }

    const timePositions = ['hrs', 'mins']

    for(let i = 0; i < 2; i++){
        $(`.wrtp-dropdown-selector-${timePositions[i]}`).each(function(){
            $(this).bind('click', () => {
                changeValue(wrapper, $(this), i)
                $(`.wrtp-dropdown-selector-${timePositions[i]}`).each(function(){
                    $(this).removeClass('selected')
                })
                $(this).addClass('selected')
            })
        })
    }

}

let wrtpShowing = false
let timepickers = $('input[type=time]')
timepickers.each(function(i){

    /* If there's a set value, use that as default  */
    if($(this).val().split(':').length === 2){
        let newDefault = $(this).val().split(':')
        defaultTime = {
            hours: parseInt(newDefault[0]),
            mins: parseInt(newDefault[1])
        }
    }

    /* Replace this with my timepicker module */
    $(this).css({display: 'none'})
    $(this).parent().append(replacementContent($(this).attr('name'), defaultTime))
    const me = $(this).siblings('.wrtp-wrapper')
    populateoptions()
    bindDropdownOptions(me)

    /* Populate the drop-down menu */
    me.bind('click', () => {
        !wrtpShowing ? show(me) : null
        wrtpShowing = true
    })

    /* Show when clicked on */
    const show = me => {
        me.children('.wrtp-dropdown')[0].classList.add('show')
    }

})

$(document).on('click', e => {
    e.preventDefault()
    if(!$(e.target).parents('.wrtp-wrapper').length){
        $('.wrtp-dropdown').each(function(){
            $(this).removeClass('show')
        })
        wrtpShowing = false
    }
})