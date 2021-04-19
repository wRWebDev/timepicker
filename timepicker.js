/*
 *  JQuery TimePicker v1.1.0
 * 
 *  Author:     @WRWebDev
 *  Copyright:  © Will Robertson 2021
 *  License:    MIT
 *  Repo:       https://github.com/wRWebDev/timepicker
*/

/*    
    Loads in place of the HTML markup:
    <input type="time" name="{pick a name}" (value="{hh:mm}" opt.) (step="{x}" opt.) />

    ! USER OPTIONS
    > Default Time - 12:00 (midday)
        defaultTime = { hours: x (int), mins: x (int) }
        This is overwritten if a valid value attribute is specified in the markup
    > Minute Increments
        minInc = x (int)
        This is overwritten if a valid step attribute is specified in the markup
*/

// ! USER OPTIONS
let defaultTime = { hours: 12, mins: 0 }
const minInc = 15

// Takes int / str, returns string ( left padded with zeros, 2 chars long )
const twoDigitPad = val => ('00' + val).slice(-2)

// Arrays to generate dropdown options
const hours = [ ...Array(24).keys() ]
const mins = [ ...Array(60 / minInc).keys() ]

// For reducing amount of code written
const timePositions = ['hrs', 'mins']

// Keeps track of if a timepicker is showing or not
let wrtpShowing = false

// The markup is replaced with this content - takes the name as a string
const replacementContent = ({name = String, time = Object}) => `
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
const populateoptions = wrapper => {
    wrapper.find('.wrtp-dropdown-hrs').html(
        hours.map(i => `
            <div 
                class="wrtp-dropdown-selector-hrs${i === defaultTime.hours ? ' selected' : ''}" 
                data-val="${i}"
            >
                ${twoDigitPad(i)}
            </div>
        `)
    )
    wrapper.find('.wrtp-dropdown-mins').html(
        mins.map(i => `
            <div 
                class="wrtp-dropdown-selector-mins${(i * minInc) === defaultTime.mins ? ' selected' : ''}" 
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
        value[pos] = twoDigitPad(selection.attr('data-val'))
        wrapper.children('input').val(value.join(':'))
        wrapper.find('span').html(wrapper.children('input').val())
    }

    for(let i = 0; i < 2; i++){
        wrapper.find(`.wrtp-dropdown-selector-${timePositions[i]}`).each(function(){
            $(this).bind('click', () => {
                changeValue(wrapper, $(this), i)
                wrapper.find(`.wrtp-dropdown-selector-${timePositions[i]}`).each(function(){
                    $(this).removeClass('selected')
                })
                $(this).addClass('selected')
            })
        })
    }

}

/* Show when clicked on */
const show = me => {me.children('.wrtp-dropdown')[0].classList.add('show')}

/* Hide when clicked off */
$(document).on('click', e => {
    e.preventDefault()
    if(!$(e.target).parents('.wrtp-wrapper').length){
        $('.wrtp-dropdown').each(function(){
            $(this).removeClass('show')
        })
        wrtpShowing = false
    }
})

let timepickers = $('input[type=time]')
timepickers.each(function(){

    /* Replace the input with this timepicker module */
    $(this).css({display: 'none'})
    $(this).parent().append(replacementContent({
        name: $(this).attr('name'), 
        time: $(this).val().split(':').length === 2
                ? { 
                    hours: parseInt($(this).val().split(':')[0]),
                    mins: parseInt($(this).val().split(':')[1])
                }
                : defaultTime
    }))
    const me = $(this).siblings('.wrtp-wrapper')
    populateoptions(me)
    bindDropdownOptions(me)


    me.bind('click', () => {
        !wrtpShowing ? show(me) : null
        wrtpShowing = true
    })

})