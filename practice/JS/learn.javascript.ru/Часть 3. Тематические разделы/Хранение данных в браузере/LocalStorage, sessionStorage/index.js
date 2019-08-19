/**Автосохранение поля формы
Создайте поле textarea, значение которого будет автоматически сохраняться при каждом его изменении.

Когда пользователь закроет страницу и потом откроет её заново он должен увидеть последнее введённое значение. */

    btn.onclick = function() {
      localStorage.removeItem('area')
      area.value='';
    }

    area.value = localStorage.getItem('area');
    area.oninput = () => {
      localStorage.setItem('area', area.value)
    };
