import './EditProfile.css';

const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
      {/* PREVIEW DA IMAGEM */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" disabled />
        <label>
          <span>Imagem do perfil:</span>
          <input type="file" />
        </label>
        <label>
          <span>Biografia:</span>
          <input type="text" placeholder="Descrição do perfil" />
        </label>
        <label>
          <span>Alterar senha:</span>
          <input type="password" placeholder="Digite sua senha" />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
};

export default EditProfile;
