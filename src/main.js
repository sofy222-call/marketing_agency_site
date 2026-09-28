import './style.css'


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
    row.dataset.label


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
        'Select at least one service'

      return

    }


    estimatorNote.textContent =
      'Approximate estimate based on your selections.'

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
// PROJECT START
// =========================================

console.log(
  'Marketing Agency project started'
)