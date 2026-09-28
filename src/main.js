import './style.css'
import {
  initI18n,
  t
} from './i18n.js'


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
// PROJECT START
// =========================================

console.log(
  'Marketing Agency project started'
)