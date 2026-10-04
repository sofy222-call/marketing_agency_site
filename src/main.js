import './style.css'
import {
  initI18n,
  t
} from './i18n.js'
import { gsap } from 'gsap'

import {
  ScrollTrigger
} from 'gsap/ScrollTrigger'


gsap.registerPlugin(
  ScrollTrigger
)

initI18n()

// =========================================
// SERVICES
// =========================================

const servicesShell =
  document.querySelector('.services-shell')

const serviceRows =
  document.querySelectorAll('.service-row')

const servicePreview =
  document.querySelector('#service-preview')

const servicePreviewVisual =
  document.querySelector('#service-preview-visual')

const servicePreviewLabel =
  document.querySelector('#service-preview-label')



function activateService(row) {

  const service =
    row.dataset.service

  const label =
  t(
    `services.preview.${service}`
  )
  window.addEventListener(
  'languagechange',
  function () {

    const activeService =
      document.querySelector(
        '.service-row.is-active'
      )


    if (activeService) {

      activateService(
        activeService
      )

    }

  }
)

  serviceRows.forEach(
    function (item) {

      item.classList.remove(
        'is-active'
      )

    }
  )


  row.classList.add(
    'is-active'
  )


  servicePreviewVisual.dataset.service =
    service


  servicePreviewLabel.textContent =
    label


  servicePreview.classList.add(
    'is-visible'
  )

}



function hideServicePreview() {

  serviceRows.forEach(
    function (item) {

      item.classList.remove(
        'is-active'
      )

    }
  )


  servicePreview.classList.remove(
    'is-visible'
  )

}



serviceRows.forEach(
  function (row) {

    row.addEventListener(
      'mouseenter',
      function () {

        activateService(row)

      }
    )


    row.addEventListener(
      'focus',
      function () {

        activateService(row)

      }
    )

  }
)



if (servicesShell) {

  servicesShell.addEventListener(
    'mouseleave',
    hideServicePreview
  )

}

// =========================================
// PROJECT ESTIMATOR
// =========================================

const estimator =
  document.querySelector('#estimator')


if (estimator) {

  const serviceInputs =
    estimator.querySelectorAll(
      'input[name="service"]'
    )


  const companyInputs =
    estimator.querySelectorAll(
      'input[name="company-size"]'
    )


  const timelineInputs =
    estimator.querySelectorAll(
      'input[name="timeline"]'
    )


  const estimatedPrice =
    estimator.querySelector(
      '#estimated-price'
    )


  const estimatorNote =
    estimator.querySelector(
      '#estimator-note'
    )



  function formatPrice(value) {

    return new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }
    ).format(value)

  }



  function calculateEstimator() {

    const selectedServices =
      estimator.querySelectorAll(
        'input[name="service"]:checked'
      )


    let basePrice = 0


    selectedServices.forEach(
      function (input) {

        basePrice +=
          Number(
            input.dataset.price
          )

      }
    )



    const selectedCompany =
      estimator.querySelector(
        'input[name="company-size"]:checked'
      )


    const selectedTimeline =
      estimator.querySelector(
        'input[name="timeline"]:checked'
      )



    const companyMultiplier =
      selectedCompany
        ? Number(
            selectedCompany.dataset.multiplier
          )
        : 1


    const timelineMultiplier =
      selectedTimeline
        ? Number(
            selectedTimeline.dataset.multiplier
          )
        : 1



    const total =
      Math.round(
        basePrice
        * companyMultiplier
        * timelineMultiplier
      )



    estimatedPrice.textContent =
      formatPrice(total)



    if (selectedServices.length === 0) {

      estimatorNote.textContent =
  t(
    'estimator.selectService'
  )

      return

    }

estimatorNote.textContent =
  t(
    'estimator.note'
  )
  window.addEventListener(
  'languagechange',
  function () {

    calculateEstimator()

  }
)

  }



  serviceInputs.forEach(
    function (input) {

      input.addEventListener(
        'change',
        calculateEstimator
      )

    }
  )


  companyInputs.forEach(
    function (input) {

      input.addEventListener(
        'change',
        calculateEstimator
      )

    }
  )


  timelineInputs.forEach(
    function (input) {

      input.addEventListener(
        'change',
        calculateEstimator
      )

    }
  )


  calculateEstimator()

}
// =========================================
// MOBILE MENU
// =========================================

const menuToggle =
  document.querySelector(
    '#menu-toggle'
  )

const mainNav =
  document.querySelector(
    '#main-nav'
  )


function setMenuState(isOpen) {

  if (
    !menuToggle
    || !mainNav
  ) {

    return

  }


  mainNav.classList.toggle(
    'is-open',
    isOpen
  )


  menuToggle.classList.toggle(
    'is-open',
    isOpen
  )


  document.body.classList.toggle(
    'menu-open',
    isOpen
  )


  menuToggle.setAttribute(
    'aria-expanded',
    String(isOpen)
  )


  menuToggle.setAttribute(
    'aria-label',
    isOpen
      ? t('nav.close')
      : t('nav.menu')
  )

}



if (
  menuToggle
  && mainNav
) {

  menuToggle.addEventListener(
    'click',
    function () {

      const isOpen =
        !mainNav.classList.contains(
          'is-open'
        )


      setMenuState(
        isOpen
      )

    }
  )


  mainNav
    .querySelectorAll('a')
    .forEach(
      function (link) {

        link.addEventListener(
          'click',
          function () {

            setMenuState(false)

          }
        )

      }
    )


  window.addEventListener(
    'keydown',
    function (event) {

      if (
        event.key === 'Escape'
      ) {

        setMenuState(false)

      }

    }
  )


  window.addEventListener(
    'languagechange',
    function () {

      const isOpen =
        mainNav.classList.contains(
          'is-open'
        )


      menuToggle.setAttribute(
        'aria-label',
        isOpen
          ? t('nav.close')
          : t('nav.menu')
      )

    }
  )

}
// =========================================
// CONTACT FORM
// =========================================

const contactForm =
  document.querySelector(
    '#contact-form'
  )


if (contactForm) {

  const contactSuccess =
    document.querySelector(
      '#contact-success'
    )


  const fields = {

    name:
      document.querySelector(
        '#contact-name'
      ),

    email:
      document.querySelector(
        '#contact-email'
      ),

    project:
      document.querySelector(
        '#contact-project'
      ),

    budget:
      document.querySelector(
        '#contact-budget'
      ),

    message:
      document.querySelector(
        '#contact-message'
      )

  }



  function showError(
    fieldName,
    message
  ) {

    const field =
      fields[fieldName]


    const error =
      document.querySelector(
        `[data-error-for="${fieldName}"]`
      )


    field.classList.add(
      'is-invalid'
    )


    error.textContent =
      message

  }



  function clearError(
    fieldName
  ) {

    const field =
      fields[fieldName]


    const error =
      document.querySelector(
        `[data-error-for="${fieldName}"]`
      )


    field.classList.remove(
      'is-invalid'
    )


    error.textContent =
      ''

  }



  function clearErrors() {

    Object
      .keys(fields)
      .forEach(
        function (fieldName) {

          clearError(
            fieldName
          )

        }
      )

  }



  function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email)

  }



  contactForm.addEventListener(
    'submit',
    function (event) {

      event.preventDefault()


      clearErrors()


      let isValid =
        true



      if (
        !fields.name.value.trim()
      ) {

        showError(
          'name',
          t(
            'contact.error.name'
          )
        )

        isValid =
          false

      }



      if (
        !isValidEmail(
          fields.email.value.trim()
        )
      ) {

        showError(
          'email',
          t(
            'contact.error.email'
          )
        )

        isValid =
          false

      }



      if (
        !fields.project.value
      ) {

        showError(
          'project',
          t(
            'contact.error.project'
          )
        )

        isValid =
          false

      }



      if (
        !fields.budget.value
      ) {

        showError(
          'budget',
          t(
            'contact.error.budget'
          )
        )

        isValid =
          false

      }



      if (
        fields.message
          .value
          .trim()
          .length < 10
      ) {

        showError(
          'message',
          t(
            'contact.error.message'
          )
        )

        isValid =
          false

      }



      if (!isValid) {

        return

      }



      contactForm.hidden =
        true


      contactSuccess.hidden =
        false


      contactForm.reset()

    }
  )



  Object
    .entries(fields)
    .forEach(
      function (
        [fieldName, field]
      ) {

        field.addEventListener(
          'input',
          function () {

            clearError(
              fieldName
            )

          }
        )


        field.addEventListener(
          'change',
          function () {

            clearError(
              fieldName
            )

          }
        )

      }
    )



  window.addEventListener(
    'languagechange',
    clearErrors
  )

}
  // =========================================
  // HERO PARALLAX
  // =========================================

  const heroObject =
    document.querySelector(
      '.hero-object'
    )


  if (heroObject) {

    const heroMedia =
      gsap.matchMedia()


    heroMedia.add(
      '(min-width: 901px)',
      function () {

        gsap.to(
          heroObject,

          {
            yPercent:
              10,

            ease:
              'none',

            scrollTrigger: {

              trigger:
                '.hero',

              start:
                'top top',

              end:
                'bottom top',

              scrub:
                1

            }

          }
        )

      }
    )

  }
// =========================================
// MOTION
// =========================================

function initMotion() {

  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches


  if (reduceMotion) {

    gsap.set(
      [
        '.hero .section-kicker',
        '.hero-title span',
        '.hero-description',
        '.hero .primary-button',
        '.hero-object',
        '.hero-media-meta'
      ],
      {
        clearProps: 'all'
      }
    )

    return

  }


  // =========================================
  // HERO
  // =========================================

  const heroTimeline =
    gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    })


  heroTimeline

    .fromTo(
      '.hero .section-kicker',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        clearProps:
          'opacity,visibility,transform'
      }
    )

    .fromTo(
      '.hero-title span',
      {
        opacity: 0,
        y: 70
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.09,
        clearProps:
          'opacity,visibility,transform'
      },
      '-=0.1'
    )

    .fromTo(
      '.hero-description',
      {
        opacity: 0,
        y: 25
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        clearProps:
          'opacity,visibility,transform'
      },
      '-=0.3'
    )

    .fromTo(
      '.hero .primary-button',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        clearProps:
          'opacity,visibility,transform'
      },
      '-=0.35'
    )

    .fromTo(
      '.hero-object',
      {
        opacity: 0,
        scale: 0.82,
        rotation: -16
      },
      {
        opacity: 1,
        scale: 1,
        rotation: -10,
        duration: 0.9,
        ease: 'expo.out'
      },
      '-=0.7'
    )

    .fromTo(
      '.hero-media-meta',
      {
        opacity: 0,
        y: 12
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        clearProps:
          'opacity,visibility,transform'
      },
      '-=0.35'
    )


  // =========================================
  // SIMPLE SCROLL REVEALS
  // =========================================

  const revealElements =
    gsap.utils.toArray(
      `
      .stat-item,
      .service-row,
      .case-project,
      .process-step,
      .estimator-group
      `
    )


  revealElements.forEach(
    function (element) {

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',

          clearProps:
            'opacity,visibility,transform',

          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true
          }
        }
      )

    }
  )


  // =========================================
  // MANIFESTO WOW
  // =========================================

  const manifesto =
    document.querySelector(
      '.manifesto'
    )


  if (manifesto) {

    const manifestoTitle =
      manifesto.querySelector(
        'h2'
      )

    const manifestoLabel =
      manifesto.querySelector(
        '.section-label'
      )

    const manifestoMedia =
      gsap.matchMedia()


    // DESKTOP

    manifestoMedia.add(
      '(min-width: 901px)',
      function () {

        gsap.fromTo(
          manifesto,
          {
            backgroundColor:
              '#0A0A0A',

            color:
              '#F2F0EA'
          },
          {
            backgroundColor:
              '#F2F0EA',

            color:
              '#0A0A0A',

            ease:
              'none',

            scrollTrigger: {
              trigger:
                manifesto,

              start:
                'top 85%',

              end:
                'top 25%',

              scrub:
                1
            }
          }
        )


        if (manifestoTitle) {

          gsap.fromTo(
            manifestoTitle,
            {
              scale:
                0.78,

              opacity:
                0.35
            },
            {
              scale:
                1,

              opacity:
                1,

              ease:
                'none',

              scrollTrigger: {
                trigger:
                  manifesto,

                start:
                  'top 80%',

                end:
                  'center 55%',

                scrub:
                  1
              }
            }
          )

        }


        if (manifestoLabel) {

          gsap.fromTo(
            manifestoLabel,
            {
              opacity:
                0
            },
            {
              opacity:
                1,

              duration:
                0.5,

              scrollTrigger: {
                trigger:
                  manifesto,

                start:
                  'top 65%',

                once:
                  true
              }
            }
          )

        }

      }
    )


    // MOBILE

    manifestoMedia.add(
      '(max-width: 900px)',
      function () {

        if (manifestoTitle) {

          gsap.fromTo(
            manifestoTitle,
            {
              opacity:
                0,

              y:
                45
            },
            {
              opacity:
                1,

              y:
                0,

              duration:
                0.75,

              ease:
                'power3.out',

              clearProps:
                'opacity,visibility,transform',

              scrollTrigger: {
                trigger:
                  manifesto,

                start:
                  'top 82%',

                once:
                  true
              }
            }
          )

        }

      }
    )

  }
  // =========================================
  // CONTACT REVEAL
  // =========================================

  const contact =
    document.querySelector(
      '.contact'
    )


  if (contact) {

    const contactItems =
      contact.querySelectorAll(
        `
        .section-kicker,
        h2,
        .contact-form > *
        `
      )


    gsap.fromTo(
      contactItems,

      {
        opacity:
          0,

        y:
          30
      },

      {
        opacity:
          1,

        y:
          0,

        duration:
          0.6,

        stagger:
          0.07,

        ease:
          'power3.out',

        scrollTrigger: {

          trigger:
            contact,

          start:
            'top 82%',

          once:
            true

        },

        clearProps:
          'opacity,visibility,transform'

      }
    )

  }
}

// =========================================
// START MOTION
// =========================================

function startMotion() {

  initMotion()

  ScrollTrigger.refresh()

}


if (
  document.fonts
  && document.fonts.ready
) {

  document.fonts.ready.then(
    function () {

      requestAnimationFrame(
        startMotion
      )

    }
  )

} else {

  requestAnimationFrame(
    startMotion
  )

}
// =========================================
// REFRESH MOTION AFTER LAYOUT CHANGES
// =========================================

window.addEventListener(
  'languagechange',
  function () {

    requestAnimationFrame(
      function () {

        ScrollTrigger.refresh()

      }
    )

  }
)


window.addEventListener(
  'resize',
  function () {

    ScrollTrigger.refresh()

  }
)
// =========================================
// PROJECT START
// =========================================

console.log(
  'Marketing Agency project started'
)