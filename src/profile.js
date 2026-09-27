import './style.css'


// =========================================
// SETTINGS
// =========================================

const STORAGE_KEY = 'agencyClientProfile'


// =========================================
// DEFAULT DATA
// =========================================

const defaultProfile = {

  name: 'Sofia',

  company: 'Marketing Agency',

  email: 'hello@agency.com',

  status: 'Strategy phase',

  budget: '$3,000 – $7,000',

  timeline: '1–3 months',

  services: [
    'Social Media',
    'Content'
  ]

}



// =========================================
// ELEMENTS
// =========================================

const profileView =
  document.querySelector('#profile-view')

const editForm =
  document.querySelector('#profile-edit-form')

const editButton =
  document.querySelector('#edit-profile-button')

const cancelButton =
  document.querySelector('#cancel-edit-button')

const successMessage =
  document.querySelector('#profile-success-message')


const profileAvatar =
  document.querySelector('#profile-avatar')

const profileName =
  document.querySelector('#profile-name')

const profileCompany =
  document.querySelector('#profile-company')


const viewName =
  document.querySelector('#view-name')

const viewCompany =
  document.querySelector('#view-company')

const viewEmail =
  document.querySelector('#view-email')

const viewStatus =
  document.querySelector('#view-status')

const viewBudget =
  document.querySelector('#view-budget')

const viewTimeline =
  document.querySelector('#view-timeline')

const viewServices =
  document.querySelector('#view-services')


const editName =
  document.querySelector('#edit-name')

const editCompany =
  document.querySelector('#edit-company')

const editEmail =
  document.querySelector('#edit-email')

const editStatus =
  document.querySelector('#edit-status')

const editBudget =
  document.querySelector('#edit-budget')

const editTimeline =
  document.querySelector('#edit-timeline')



// =========================================
// LOAD DATA
// =========================================

function loadProfile() {

  const savedProfile =
    localStorage.getItem(STORAGE_KEY)


  if (!savedProfile) {

    return defaultProfile

  }


  try {

    const parsedProfile =
      JSON.parse(savedProfile)


    return {

      ...defaultProfile,

      ...parsedProfile,

      services:
        Array.isArray(parsedProfile.services)
          ? parsedProfile.services
          : defaultProfile.services

    }

  } catch (error) {

    console.error(
      'Profile loading error:',
      error
    )


    return defaultProfile

  }

}



// =========================================
// SAVE DATA
// =========================================

function saveProfile(profile) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(profile)
  )

}



// =========================================
// RENDER
// =========================================

function renderProfile(profile) {

  profileName.textContent =
    profile.name

  profileCompany.textContent =
    profile.company


  viewName.textContent =
    profile.name

  viewCompany.textContent =
    profile.company

  viewEmail.textContent =
    profile.email

  viewStatus.textContent =
    profile.status

  viewBudget.textContent =
    profile.budget

  viewTimeline.textContent =
    profile.timeline


  const firstLetter =
    profile.name
      .trim()
      .charAt(0)
      .toUpperCase()


  profileAvatar.textContent =
    firstLetter || 'A'


  viewServices.innerHTML = ''


  if (profile.services.length === 0) {

    const emptyMessage =
      document.createElement('span')

    emptyMessage.textContent =
      'No services selected'

    viewServices.appendChild(
      emptyMessage
    )

    return

  }


  profile.services.forEach(
    function (service) {

      const tag =
        document.createElement('span')

      tag.textContent =
        service

      viewServices.appendChild(tag)

    }
  )

}



// =========================================
// FILL FORM
// =========================================

function fillForm(profile) {

  editName.value =
    profile.name

  editCompany.value =
    profile.company

  editEmail.value =
    profile.email

  editStatus.value =
    profile.status

  editBudget.value =
    profile.budget

  editTimeline.value =
    profile.timeline


  const checkboxes =
    document.querySelectorAll(
      'input[name="profile-service"]'
    )


  checkboxes.forEach(
    function (checkbox) {

      checkbox.checked =
        profile.services.includes(
          checkbox.value
        )

    }
  )

}



// =========================================
// OPEN EDIT MODE
// =========================================

function openEditMode() {

  const profile =
    loadProfile()


  fillForm(profile)


  profileView.hidden =
    true

  editForm.hidden =
    false

  editButton.hidden =
    true

  successMessage.hidden =
    true

}



// =========================================
// CLOSE EDIT MODE
// =========================================

function closeEditMode() {

  profileView.hidden =
    false

  editForm.hidden =
    true

  editButton.hidden =
    false

}



// =========================================
// GET FORM DATA
// =========================================

function collectFormData() {

  const checkedServices =
    document.querySelectorAll(
      'input[name="profile-service"]:checked'
    )


  const services =
    Array
      .from(checkedServices)
      .map(
        function (checkbox) {

          return checkbox.value

        }
      )


  return {

    name:
      editName.value.trim(),

    company:
      editCompany.value.trim(),

    email:
      editEmail.value.trim(),

    status:
      editStatus.value,

    budget:
      editBudget.value,

    timeline:
      editTimeline.value,

    services:
      services

  }

}



// =========================================
// EVENTS
// =========================================

editButton.addEventListener(
  'click',
  function () {

    openEditMode()

  }
)


cancelButton.addEventListener(
  'click',
  function () {

    closeEditMode()

  }
)


editForm.addEventListener(
  'submit',
  function (event) {

    event.preventDefault()


    if (!editForm.checkValidity()) {

      editForm.reportValidity()

      return

    }


    const profile =
      collectFormData()


    saveProfile(profile)

    renderProfile(profile)

    closeEditMode()


    successMessage.hidden =
      false


    setTimeout(
      function () {

        successMessage.hidden =
          true

      },
      2500
    )

  }
)



// =========================================
// INITIAL LOAD
// =========================================

const profile =
  loadProfile()


renderProfile(profile)